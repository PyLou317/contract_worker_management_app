import React from 'react';
import { useState } from 'react';
import { MessageContext } from './message-page-context';
import SendSMSMessage from './sendMessage';

export default function MessagingPage() {
  const ctxValue = {};
  return (
    <MessageContext.Provider value={{ ctxValue }}>
      <SendSMSMessage />
    </MessageContext.Provider>
  );
}
