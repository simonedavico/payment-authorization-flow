import { Machine, assign } from "xstate";

const paymentAuthorizationMachine = Machine(
  {
    id: "paymentAuthorization",
    initial: "checkPrerequisites",
    // we will track payment authorization details in the machine's context
    context: {
      paymentAuthorizationId: null,
      expiresOn: null,
      // ...more fields
    },
    states: {
      checkPrerequisites: {
        invoke: {
          id: "checkPrerequistes",
          src: "checkPrerequisites",
          onDone: {
            target: "fetchingPaymentDetails",
          },
          onError: {
            target: "prerequisitesNotMet",
          },
        },
      },
      fetchingPaymentDetails: {
        invoke: {
          id: "fetchPaymentDetails",
          src: "fetchPaymentDetails",
          onDone: {
            target: "paymentDetailsFetched",
            actions: assign((ctx, event) => {
              return event.data;
            }),
          },
          onError: {
            target: "paymentDetailsError",
          },
        },
      },
      paymentDetailsFetched: {
        after: {
          AUTHORIZATION_EXPIRES: {
            target: "authorizationExpired",
          },
        },
        on: {
          DISMISS: "authorizationDismissed",
          KEYCHAIN_ACCESS_OK: "authorizingPayment",
          KEYCHAIN_ACCESS_KO: "biometricFactorError",
        },
      },
      authorizingPayment: {
        after: {
          AUTHORIZATION_EXPIRES: {
            target: "authorizationExpired",
          },
        },
        invoke: {
          id: "authorizePayment",
          src: "authorizePayment",
          onDone: {
            target: "paymentAuthorized",
          },
          onError: {
            target: "authorizationError",
          },
        },
      },
      paymentAuthorized: { type: "final" },
      authorizationDismissed: { type: "final" },
      paymentDetailsError: { type: "final" },
      prerequisitesNotMet: { type: "final" },
      authorizationExpired: { type: "final" },
      authorizationError: { type: "final" },
      biometricFactorError: { type: "final" },
    },
  },
  {
    delays: {
      AUTHORIZATION_EXPIRES: (ctx) => {
        return Math.max(ctx.expiresOn - new Date(), 0);
      },
    },
  }
);

export default paymentAuthorizationMachine;
