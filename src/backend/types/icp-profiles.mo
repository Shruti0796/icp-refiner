import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type ProfileId = Common.ProfileId;

  public type CompanySize = {
    #startup;
    #smb;
    #midMarket;
    #enterprise;
  };

  public type BudgetRange = {
    #lessThan10k;
    #tenKTo50k;
    #fiftyKTo200k;
    #moreThan200k;
  };

  public type Profile = {
    id : ProfileId;
    owner : UserId;
    name : Text;
    industry : Text;
    companySize : ?CompanySize;
    useCase : Text;
    painPoints : [Text];
    budgetRange : ?BudgetRange;
    decisionMakers : [Text];
    targetGeography : Text;
    shareCode : ?Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type CreateProfileInput = {
    name : Text;
    industry : Text;
    companySize : ?CompanySize;
    useCase : Text;
    painPoints : [Text];
    budgetRange : ?BudgetRange;
    decisionMakers : [Text];
    targetGeography : Text;
  };

  public type UpdateProfileInput = {
    id : ProfileId;
    name : ?Text;
    industry : ?Text;
    companySize : ?CompanySize;
    useCase : ?Text;
    painPoints : ?[Text];
    budgetRange : ?BudgetRange;
    decisionMakers : ?[Text];
    targetGeography : ?Text;
  };

  public type PublicProfile = {
    id : ProfileId;
    name : Text;
    industry : Text;
    companySize : ?CompanySize;
    useCase : Text;
    painPoints : [Text];
    budgetRange : ?BudgetRange;
    decisionMakers : [Text];
    targetGeography : Text;
  };
};
