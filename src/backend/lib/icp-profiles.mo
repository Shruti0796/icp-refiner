import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Types "../types/icp-profiles";

module {
  public type ProfileStore = Map.Map<Types.ProfileId, Types.Profile>;
  public type ShareCodeIndex = Map.Map<Text, Types.ProfileId>;

  // Characters used to generate share codes
  let CHARS : [Char] = [
    '0','1','2','3','4','5','6','7','8','9',
    'A','B','C','D','E','F','G','H','J','K',
    'L','M','N','P','Q','R','S','T','U','V',
    'W','X','Y','Z'
  ];

  // Generate a deterministic 8-char code from a seed nat
  func makeCode(seed : Nat) : Text {
    let base = CHARS.size();
    var n = seed;
    let chars : [var Char] = [var ' ',' ',' ',' ',' ',' ',' ',' '];
    var i : Nat = 7;
    label fill : () loop {
      let idx = n % base;
      chars[i] := CHARS[idx];
      n := n / base;
      if (i == 0) break fill;
      i -= 1;
    };
    var result = "";
    var j : Nat = 0;
    while (j < 8) {
      result #= Text.fromChar(chars[j]);
      j += 1;
    };
    result
  };

  public func createProfile(
    profiles : ProfileStore,
    _shareIndex : ShareCodeIndex,
    nextId : Nat,
    caller : Types.UserId,
    input : Types.CreateProfileInput,
  ) : Types.Profile {
    let now = Time.now();
    let profile : Types.Profile = {
      id = nextId;
      owner = caller;
      name = input.name;
      industry = input.industry;
      companySize = input.companySize;
      useCase = input.useCase;
      painPoints = input.painPoints;
      budgetRange = input.budgetRange;
      decisionMakers = input.decisionMakers;
      targetGeography = input.targetGeography;
      shareCode = null;
      createdAt = now;
      updatedAt = now;
    };
    profiles.add(nextId, profile);
    profile
  };

  public func getProfile(
    profiles : ProfileStore,
    caller : Types.UserId,
    id : Types.ProfileId,
  ) : ?Types.Profile {
    switch (profiles.get(id)) {
      case (?p) {
        if (Principal.equal(p.owner, caller)) ?p else null
      };
      case null null;
    }
  };

  public func listProfiles(
    profiles : ProfileStore,
    caller : Types.UserId,
  ) : [Types.Profile] {
    profiles.values()
      .filter(func(p : Types.Profile) : Bool { Principal.equal(p.owner, caller) })
      .toArray()
  };

  public func updateProfile(
    profiles : ProfileStore,
    caller : Types.UserId,
    input : Types.UpdateProfileInput,
  ) : ?Types.Profile {
    switch (profiles.get(input.id)) {
      case (?existing) {
        if (not Principal.equal(existing.owner, caller)) return null;
        let updated : Types.Profile = {
          existing with
          name = switch (input.name) { case (?v) v; case null existing.name };
          industry = switch (input.industry) { case (?v) v; case null existing.industry };
          companySize = switch (input.companySize) { case (?v) ?v; case null existing.companySize };
          useCase = switch (input.useCase) { case (?v) v; case null existing.useCase };
          painPoints = switch (input.painPoints) { case (?v) v; case null existing.painPoints };
          budgetRange = switch (input.budgetRange) { case (?v) ?v; case null existing.budgetRange };
          decisionMakers = switch (input.decisionMakers) { case (?v) v; case null existing.decisionMakers };
          targetGeography = switch (input.targetGeography) { case (?v) v; case null existing.targetGeography };
          updatedAt = Time.now();
        };
        profiles.add(input.id, updated);
        ?updated
      };
      case null null;
    }
  };

  public func deleteProfile(
    profiles : ProfileStore,
    shareIndex : ShareCodeIndex,
    caller : Types.UserId,
    id : Types.ProfileId,
  ) : Bool {
    switch (profiles.get(id)) {
      case (?p) {
        if (not Principal.equal(p.owner, caller)) return false;
        // Remove share code from index if present
        switch (p.shareCode) {
          case (?code) shareIndex.remove(code);
          case null {};
        };
        profiles.remove(id);
        true
      };
      case null false;
    }
  };

  public func calculateCompleteness(
    profiles : ProfileStore,
    caller : Types.UserId,
    id : Types.ProfileId,
  ) : ?Nat {
    switch (getProfile(profiles, caller, id)) {
      case null null;
      case (?p) {
        var score = 0;
        var total = 0;

        // Each field worth 1 point
        total += 1; if (p.name.size() > 0) score += 1;
        total += 1; if (p.industry.size() > 0) score += 1;
        total += 1; if (p.useCase.size() > 0) score += 1;
        total += 1; if (p.targetGeography.size() > 0) score += 1;
        total += 1; switch (p.companySize) { case (?_) score += 1; case null {} };
        total += 1; switch (p.budgetRange) { case (?_) score += 1; case null {} };
        // Pain points: full credit for 3+, partial for 1-2
        total += 1; if (p.painPoints.size() >= 3) score += 1;
        // Decision makers: full credit for 1+
        total += 1; if (p.decisionMakers.size() >= 1) score += 1;

        ?(score * 100 / total)
      };
    }
  };

  public func getRefinementSuggestions(
    profiles : ProfileStore,
    caller : Types.UserId,
    id : Types.ProfileId,
  ) : ?[Text] {
    switch (getProfile(profiles, caller, id)) {
      case null null;
      case (?p) {
        var suggestions : [Text] = [];
        if (p.name.size() == 0)
          suggestions := suggestions.concat(["Add a profile name to identify this ICP."]);
        if (p.industry.size() == 0)
          suggestions := suggestions.concat(["Specify the industry to better target your ICP."]);
        if (p.useCase.size() == 0)
          suggestions := suggestions.concat(["Describe the primary use case to clarify the value proposition."]);
        if (p.targetGeography.size() == 0)
          suggestions := suggestions.concat(["Define the target geography to focus your outreach."]);
        switch (p.companySize) {
          case null suggestions := suggestions.concat(["Select a company size to narrow your audience."]);
          case (?_) {};
        };
        switch (p.budgetRange) {
          case null suggestions := suggestions.concat(["Add a budget range to qualify prospects effectively."]);
          case (?_) {};
        };
        if (p.painPoints.size() == 0)
          suggestions := suggestions.concat(["Add at least 3 pain points for a more targeted profile."])
        else if (p.painPoints.size() < 3)
          suggestions := suggestions.concat(["Add more pain points — aim for at least 3 for a comprehensive profile."]);
        if (p.decisionMakers.size() == 0)
          suggestions := suggestions.concat(["List at least one decision maker role to guide your outreach."]);
        ?suggestions
      };
    }
  };

  public func generateShareCode(
    profiles : ProfileStore,
    shareIndex : ShareCodeIndex,
    caller : Types.UserId,
    id : Types.ProfileId,
  ) : ?Text {
    switch (profiles.get(id)) {
      case null null;
      case (?p) {
        if (not Principal.equal(p.owner, caller)) return null;
        // Return existing code if already generated
        switch (p.shareCode) {
          case (?existing) return ?existing;
          case null {};
        };
        // Generate a unique code using id + current time as seed
        let now = Time.now();
        let seed = id + Int.abs(now);
        let code = makeCode(seed);
        let updated : Types.Profile = { p with shareCode = ?code; updatedAt = now };
        profiles.add(id, updated);
        shareIndex.add(code, id);
        ?code
      };
    }
  };

  public func getPublicProfile(
    profiles : ProfileStore,
    shareIndex : ShareCodeIndex,
    shareCode : Text,
  ) : ?Types.PublicProfile {
    switch (shareIndex.get(shareCode)) {
      case null null;
      case (?profileId) {
        switch (profiles.get(profileId)) {
          case null null;
          case (?p) {
            ?{
              id = p.id;
              name = p.name;
              industry = p.industry;
              companySize = p.companySize;
              useCase = p.useCase;
              painPoints = p.painPoints;
              budgetRange = p.budgetRange;
              decisionMakers = p.decisionMakers;
              targetGeography = p.targetGeography;
            }
          };
        }
      };
    }
  };
};
