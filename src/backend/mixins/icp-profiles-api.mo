import Types "../types/icp-profiles";
import ProfileLib "../lib/icp-profiles";

mixin (
  profiles : ProfileLib.ProfileStore,
  shareIndex : ProfileLib.ShareCodeIndex,
  counter : { var nextProfileId : Nat },
) {
  public shared ({ caller }) func createProfile(input : Types.CreateProfileInput) : async Types.Profile {
    let profile = ProfileLib.createProfile(profiles, shareIndex, counter.nextProfileId, caller, input);
    counter.nextProfileId += 1;
    profile
  };

  public shared query ({ caller }) func getProfile(id : Types.ProfileId) : async ?Types.Profile {
    ProfileLib.getProfile(profiles, caller, id)
  };

  public shared query ({ caller }) func listProfiles() : async [Types.Profile] {
    ProfileLib.listProfiles(profiles, caller)
  };

  public shared ({ caller }) func updateProfile(input : Types.UpdateProfileInput) : async ?Types.Profile {
    ProfileLib.updateProfile(profiles, caller, input)
  };

  public shared ({ caller }) func deleteProfile(id : Types.ProfileId) : async Bool {
    ProfileLib.deleteProfile(profiles, shareIndex, caller, id)
  };

  public shared query ({ caller }) func calculateCompleteness(id : Types.ProfileId) : async ?Nat {
    ProfileLib.calculateCompleteness(profiles, caller, id)
  };

  public shared query ({ caller }) func getRefinementSuggestions(id : Types.ProfileId) : async ?[Text] {
    ProfileLib.getRefinementSuggestions(profiles, caller, id)
  };

  public shared ({ caller }) func generateShareCode(id : Types.ProfileId) : async ?Text {
    ProfileLib.generateShareCode(profiles, shareIndex, caller, id)
  };

  public query func getPublicProfile(shareCode : Text) : async ?Types.PublicProfile {
    ProfileLib.getPublicProfile(profiles, shareIndex, shareCode)
  };
};
