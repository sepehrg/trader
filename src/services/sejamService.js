import  * as Service from "./service";

const SejamService = {
  getNationalCode: (callback) => {
    return Service.get("Sejam/GetNationalCode", (status, data) => {
      callback(status, data);
    });
  },
  getPersonRegistrationStatus: (callback) => {
    return Service.get("Sejam/GetPersonRegistrationStatus", (status, data) => {
      callback(status, data);
    });
  },

  sendKycOtp: (nationalCode, callback) => {
    return Service.post(
      "Sejam/SendKycOtp",
      {
        NationalCode: nationalCode,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },

  getRegistrationStatusInSejam: (
    { nationalCode, clientId, captcha },
    callback
  ) => {
    return Service.post(
      "Sejam/GetRegistrationStatusInSejam",
      {
        clientId: clientId,
        nationalCode: nationalCode,
        captcha: captcha,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  getKycInfo: (nationalCode, kycOtp, clientId, captcha, callback) => {
    return Service.post(
      "Sejam/GetKycInfo",
      {
        nationalCode: nationalCode,
        kycOtp: kycOtp,
        clientId: clientId,
        captcha: captcha,
      },
      (status, data) => {
        callback(data.Success, data.Result);
      }
    );
  },
  updateProfileInfo: (params, callback) => {
    return Service.post(
      "Sejam/UpdatePerson",
      {
        Id: params.Id,
        NationalCode: params.NationalCode,
        Gender: params.Gender,
        Mobile: params.Mobile,
        FirstName: params.FirstName,
        LastName: params.LastName,
        FatherName: params.FatherName,
        IssuePlace: params.IssuePlace,
        BirthDate: new Date(params.BirthDate),
        BirthPlace: params.BirthPlace,
        PostalCode: params.PostalCode,
        SeriChar: params.SeriChar,
        SeriNumber: params.SeriNumber,
        SerialNumber: params.SerialNumber,
        ShNumber: params.ShNumber,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  saveProfileInfo: (params, callback) => {
    return Service.post(
      "Sejam/AddPerson",
      {
        NationalCode: params.NationalCode,
        Gender: params.Gender,
        Mobile: params.Mobile,
        FirstName: params.FirstName,
        LastName: params.LastName,
        FatherName: params.FatherName,
        BirthDate: params.BirthDate,
        PostalCode: params.PostalCode,
        SeriChar: params.SeriChar,
        SeriNumber: params.SeriNumber,
        SerialNumber: params.SerialNumber,
        BirthPlace: params.BirthPlace,
        IssuePlace: params.IssuePlace,
        // SerialNumber: params.Serial,
        // BirthPlace: params.PlaceOfBirth,
        // IssuePlace: params.PlaceOfIssue,
        ShNumber: params.ShNumber,
        EntryDate: new Date(),
        PersonRegistrationStatus: 1,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  updateAddressInfo: (params, callback) => {
    return Service.post(
      "Sejam/UpdateAddress",
      {
        Id: params.Id,
        ProvinceId: params.ProvinceId,
        CityId: params.CityId,
        SectionId: params.SectionId,
        RemnantAddress: params.RemnantAddress,
        Alley: params.Alley,
        Plaque: params.Plaque,
        WebSite: params.WebSite,
        Email: params.Email,
        Telephone: params.Telephone,
        CityPrefix: params.CityPrefix,
        EmergencyTelephone: params.EmergencyTelephone,
        EmergencyCityPrefix: params.EmergencyCityPrefix,
        EmergencyMobile: params.EmergencyMobile,
        EmergencyCountryPrefix: params.EmergencyCountryPrefix,
        Fax: params.Fax,
        FaxPrefix: params.FaxPrefix,
        PostalCode: params.PostalCode,
        CountryId: params.CountryId,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  saveAddressInfo: (params, callback) => {
    return Service.post(
      "Sejam/AddAddress",
      {
        ProvinceId: params.ProvinceId,
        CityId: params.CityId,
        SectionId: params.SectionId,
        RemnantAddress: params.RemnantAddress,
        Alley: params.Alley,
        Plaque: params.Plaque,
        WebSite: params.WebSite,
        Email: params.Email,
        Telephone: params.Telephone,
        CityPrefix: params.CityPrefix,
        EmergencyTelephone: params.EmergencyTelephone,
        EmergencyCityPrefix: params.EmergencyCityPrefix,
        EmergencyMobile: params.EmergencyMobile,
        EmergencyCountryPrefix: params.EmergencyCountryPrefix,
        Fax: params.Fax,
        FaxPrefix: params.FaxPrefix,
        PostalCode: params.PostalCode,
        CountryId: params.CountryId,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  updatePersonJobInfo: (params, callback) => {
    return Service.post(
      "Sejam/UpdatePersonJob",
      {
        Id: params.Id,
        Job: params.Job,
        JobDescription: params.JobDescription,
        EmployeeDate: new Date(params.EmployeeDate),
        CompanyName: params.CompanyName,
        CompanyCityPrefix: params.CompanyCityPrefix,
        CompanyTell: params.CompanyTell,
        JobPosition: params.JobPosition,
        CompanyAddress: params.CompanyAddress,
        CompanyFaxPrefix: params.CompanyFaxPrefix,
        CompanyFax: params.CompanyFax,
        CompanyPostalCode: params.CompanyPostalCode,
        CompanyEmail: params.CompanyEmail,
        CompanyWebSite: params.CompanyWebSite,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  savePersonJobInfo: (params, callback) => {
    return Service.post(
      "Sejam/AddPersonJob",
      {
        Job: params.Job,
        JobDescription: params.JobDescription,
        EmployeeDate: params.EmployeeDate,
        CompanyName: params.CompanyName,
        CompanyCityPrefix: params.CompanyCityPrefix,
        CompanyTell: params.CompanyTell,
        JobPosition: params.JobPosition,
        CompanyAddress: params.CompanyAddress,
        CompanyFaxPrefix: params.CompanyFaxPrefix,
        CompanyFax: params.CompanyFax,
        CompanyPostalCode: params.CompanyPostalCode,
        CompanyEmail: params.CompanyEmail,
        CompanyWebSite: params.CompanyWebSite,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  getPersonInfo: (callback) => {
    return Service.get("Sejam/GetPerson", (status, data) => {
      callback(status, data);
    });
  },
  getAddressInfo: (callback) => {
    return Service.get("Sejam/GetAddress", (status, data) => {
      callback(data.Success, data);
    });
  },
  getRegionTypes: (callback) => {
    return Service.get("Sejam/GetRegionTypes", (status, data) => {
      callback(status, data);
    });
  },
  getJobs: (callback) => {
    return Service.get("Sejam/GetJobs", (status, data) => {
      callback(status, data);
    });
  },
  getPersonJobInfo: (callback) => {
    return Service.get("Sejam/GetPersonJob", (status, data) => {
      callback(status, data);
    });
  },
  getRegionsByParentIdAndRegionType: (params, callback) => {
    // const url = new URL(process.env.REACT_APP_API_URL +'Sejam/GetRegionsByParentIdAndRegionType');
    // url.searchParams.append('parentId', params.parentId);
    // url.searchParams.append('regionTypeEnum', params.regionTypeId);
    let str = "Sejam/GetRegionsByParentIdAndRegionType?";
    const searchParams = new URLSearchParams();

    searchParams.append("parentId", params.parentId);
    searchParams.append("regionTypeEnum", params.regionTypeId);

    str += searchParams;
    return Service.get(str, (status, data) => {
      callback(status, data);
    });
  },
  updateBankInfo: (params, callback) => {
    return Service.post(
      "Sejam/UpdateAccount",
      {
        Id: params.Id,
        BankId: params.BankId,
        BranchCityId: params.BranchCityId,

        BranchName: params.BranchName,
        BranchCode: params.BranchCode,
        AccountNumber: params.AccountNumber,
        AccountType: params.AccountType,
        ShebaNumber: params.ShebaNumber,
        InternationalAccountNumber: params.InternationalAccountNumber || "1",
        IsDefault: params.IsDefault,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  saveBankInfo: (params, callback) => {
    return Service.post("Sejam/AddAccounts", params, (status, data) => {
      callback(status, data);
    });
  },
  getBanks: (callback) => {
    return Service.get("Sejam/GetBanks", (status, data) => {
      callback(status, data);
    });
  },
  getAccountTypes: async (callback) => {
    return await Service.get("Sejam/GetAccountTypes", (status, data) => {
      callback(status, data);
    });
  },
  getAccountsInfo: async (callback) => {
    return await Service.get("Sejam/GetAccounts", (status, data) => {
      callback(status, data);
    });
  },
  updateFinancialInfo: (params, callback) => {
    return Service.post(
      "Sejam/UpdateFinancial",
      {
        Id: params.Id,
        AssetValue: params.AssetValue,
        IncomeAverage: params.IncomeAverage,
        TradingExchange: params.TradingExchange,
        CommodityExchange: params.CommodityExchange,
        AbroadExchange: params.AbroadExchange,
        Broker: params.BrokerageCode || 1400,
        TradingKnowledgeLevel: params.TradingKnowledgeLevel,
        TransactionLevel: params.TransactionLevel,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  saveFinancialInfo: (params, callback) => {
    return Service.post(
      "Sejam/AddFinancial",
      {
        AssetValue: params.AssetValue,
        IncomeAverage: params.IncomeAverage,
        TradingExchange: params.TradingExchange,
        CommodityExchange: params.CommodityExchange,
        AbroadExchange: params.AbroadExchange,
        Broker: params.BrokerageCode || 1400,
        TradingKnowledgeLevel: params.TradingKnowledgeLevel,
        TransactionLevel: params.TransactionLevel,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  getTradingKnowledgeLevels: async (callback) => {
    return await Service.get(
      "Sejam/GetTradingKnowledgeLevels",
      (status, data) => {
        callback(status, data);
      }
    );
  },
  getTransactionLevels: async (callback) => {
    return await Service.get("Sejam/GetTransactionLevels", (status, data) => {
      callback(status, data);
    });
  },
  getFinancialInfo: async (callback) => {
    return await Service.get("Sejam/GetFinancial", (status, data) => {
      callback(status, data);
    });
  },
  sendVerificationCode: (params, callback) => {
    return Service.post(
      "Sejam/SendVerificationCode",
      {
        ReferenceCode: params.nationalCode,
        MobileNumber: params.mobileNumber,
      },
      (status, data) => {
        callback(status, data);
      }
    );
  },
  getPersonalInformation: async (callback) => {
    return await Service.get(
      "Sejam/GetPersonalInformation",
      (status, data) => {
        callback(status, data);
      }
    );
  },
  sendPersonalInformationToSejam: async (params, callback) => {
    // return await Service.get("Sejam/SendPersonalInformationToSejam",   {
    //   verificationCode: params.verificationCode,
    //   clientId: params.clientId,
    //   captcha: params.captcha,
    // }, (status, data) => {
    //   callback(status, data);
    // });

    let str = "Sejam/SendPersonalInformationToSejam?";

    const searchParams = new URLSearchParams();
    searchParams.append("verificationCode", params.verificationCode);
    searchParams.append("clientId", params.clientId);
    searchParams.append("captcha", params.captcha);

    str += searchParams;
    return Service.get(str, (status, data) => {
      callback(status, data);
    });
  },

  getRegionById: (id, callback) => {
    // var regionId= {
    //   regionId
    // }

    let str = "Sejam/GetRegionById?";

    const searchParams = new URLSearchParams();
    searchParams.append("regionId", id);

    str += searchParams;
    return Service.get(str, (status, data) => {
      return data.Result;
    });
  },
};

export default SejamService;
