const stepLevel = {
    checkInfo: {
        id: 0,
        url: "/sejam"
    },
    profile: {
        id: 1,
        url: "/main/sejam/profile"
    },
    address: {
        id: 2,
        url: "/main/sejam/address"
    },
    job: {
        id: 3,
        url: "/main/sejam/job"
    },
    bank: {
        id: 4,
        url: "/main/sejam/bank"
    },
    financial: {
        id: 5,
        url: "/main/sejam/financial"
    },
    sejam: {
        id: 6,
        url: "/main/sejam/sejam"
    },
    finalReview: {
        id: 7,
        url: "/main/sejam/finalReview"
    },
    addInSejam: {
        id: 8,
        url: "/main/sejam/addInSejam"
    },
    documentAttached: {
        id: 9,
        url: ""
    },
    verificationCompetency: {
        id: 10,
        url: ""
    },
    finalRegister: {
        id: 11,
        url: "/main/sejam/finalRegister"
    }
}

export const getUrlbyStepId = (stepId) => {
    switch (stepId) {
        case stepLevel.checkInfo.id:
            window.location.pathname = stepLevel.checkInfo.url;
            return;
        case stepLevel.profile.id:
            window.location.pathname = stepLevel.profile.url;
            return;
        case stepLevel.address.id:
            window.location.pathname = stepLevel.address.url;
            return;
        case stepLevel.job.id:
            window.location.pathname = stepLevel.job.url;
            return;
        case stepLevel.bank.id:
            window.location.pathname = stepLevel.bank.url;
            return;
        case stepLevel.financial.id:
            window.location.pathname = stepLevel.financial.url;
            return;
        case stepLevel.sejam.id:
            window.location.pathname = stepLevel.sejam.url;
            return;
            case stepLevel.finalReview.id:
                window.location.pathname = stepLevel.finalReview.url;
                return;
        default:
            window.location.pathname = stepLevel.profile.url;
    }
}

export default stepLevel;