"use client";

import React, { useEffect, useState } from "react";

import { SettingsDailog } from "@/components/others/settingsDailog";

import CoverImageDailog from "@/components/others/coverImageDailog";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsDailog />
      <CoverImageDailog />
    </>
  );
};
