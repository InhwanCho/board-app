/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutataion = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setPending(true);
    return apiMutataion(payload)
      .finally(() => setPending(false))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };
  return {
    mutate,
    pending,
  };
};

