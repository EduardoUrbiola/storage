import React, { useRef } from "react";
import { Center, Button, AlertDialog } from "native-base";

const AlertModal = ({
  header,
  body,
  cancelText = "Cancel",
  okText = "Ok",
  okBgColor = "green",
  isOpen,
  onClose = null,
  onCancel = null,
  onOk = null,
}) => {
  const cancelRef = useRef(null);
  return (
    <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{header}</AlertDialog.Header>
          <AlertDialog.Body>{body}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              {onCancel ? (
                <Button variant="ghost" colorScheme="coolGray" onPress={onCancel} ref={cancelRef}>
                  {cancelText ? cancelText : "Cancel"}
                </Button>
              ) : (
                <></>
              )}
              {onOk ? (
                <Button colorScheme={okBgColor ? okBgColor : "success"} onPress={onOk}>
                  {okText ? okText : "Close"}
                </Button>
              ) : (
                <></>
              )}
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertModal;
