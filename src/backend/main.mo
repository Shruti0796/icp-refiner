import Map "mo:core/Map";
import Types "types/icp-profiles";
import ProfileLib "lib/icp-profiles";
import IcpProfilesApi "mixins/icp-profiles-api";

actor {
  let profiles : ProfileLib.ProfileStore = Map.empty<Types.ProfileId, Types.Profile>();
  let shareIndex : ProfileLib.ShareCodeIndex = Map.empty<Text, Types.ProfileId>();
  let counter = { var nextProfileId : Nat = 0 };

  include IcpProfilesApi(profiles, shareIndex, counter);
};
