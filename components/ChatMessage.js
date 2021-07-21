import React from 'react';
import { Text, Box } from 'native-base';

const ChatMessage = (props) => {
  const { message } = props;

  return (
    <Box p={2}>
      <Text color="#111827" bold fontSize="sm">
        {message}
      </Text>
    </Box>
  );
};

export default ChatMessage;
