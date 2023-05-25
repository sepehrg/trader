import React from "react";

export function usePromise(promise, defaultValue) {
  const [state, setState] = React.useState({
    value: defaultValue,
    isPending: true,
  });

  React.useEffect(() => {
    // const promise =
    //   typeof promiseOrFunction === "function"
    //     ? promiseOrFunction()
    //     : promiseOrFunction;

    let isSubscribed = true;

    promise((status, data) =>
      isSubscribed ? setState({ value: data, isPending: false }) : null
    );

    // promise
    //   .then((value) =>
    //     isSubscribed ? setState({ value, error: null, isPending: false }) : null
    //   )
    //   .catch((error) =>
    //     isSubscribed
    //       ? setState({ value: defaultValue, error: error, isPending: false })
    //       : null
    //   );

    return () => (isSubscribed = false);
  }, [promise, defaultValue]);

  const { value, isPending } = state;
  return [value, isPending];
}
