export const getMessages = (messagesData, loginInfo) => {
  const result = [];

  if (!messagesData || messagesData.length === 0) {
    return result;
  }

  messagesData.forEach((messageData) => {
    const messageEl = getMessage(messageData, loginInfo);
    result.push(messageEl);
  });

  return result;
};

export const getMessage = (messageData, loginInfo) => {
  const result = {};
  const model = {};

  if (!messageData) {
    return null;
  }
  const isAdmin = loginInfo && loginInfo.memType === 'admin';
  const sender = messageData.senderEmail;
  const message = messageData.chatMsgCont;

  let direction = 'outgoing';

  if (isAdmin) {
    direction = sender === loginInfo.adminEmailId ? 'outgoing' : 'incoming';
  } else {
    direction = sender === loginInfo.memEmailId ? 'outgoing' : 'incoming';
  }

  model.sender = sender;
  model.message = message;
  model.direction = direction;

  result.model = model;

  return result;
};
