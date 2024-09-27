'use client';

import React from "react";
import { SessionProvider } from "next-auth/react";

interface NextSessionProviderPros {
    children: React.ReactNode
    session: any
}

const NextSessionProvider = ({ children, session }: NextSessionProviderPros) => {
    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    )
}

export default NextSessionProvider;