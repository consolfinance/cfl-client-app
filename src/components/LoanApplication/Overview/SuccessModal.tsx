"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Modal, Text, View } from "reshaped";
import { Check } from "lucide-react";
import styles from "./Overview.module.scss";
const SuccessModal: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const params = useParams();
  const documentId = params.applicationId;

  const handleClose = () => {
    router.push("/");
    onClose();
  };

  return (
    <Modal
      active={isOpen}
      onClose={handleClose}
      disableCloseOnOutsideClick
      size="600px"
    >
      <View gap={4} padding={4} align="center">
        <View
          className={styles.modalLogo}
          align={"center"}
          justify={"center"}
          backgroundColor="neutral-faded"
        >
          <Check color="#9108db" />
        </View>
        <Text variant="featured-3">Application Submitted!</Text>
        <Text variant="body-2" color="neutral-faded">
          Thank you for your application. Our credit team will review your submission
          and contact you within 48 hours.
        </Text>

        <View
          width="100%"
          backgroundColor="neutral-faded"
          direction={"row"}
          gap={1}
          padding={2}
          justify="center"
        >
          <Text>Reference Number:</Text>
          <Text color="neutral-faded">{documentId}</Text>
        </View>

        <Button
          className={styles.button}
          onClick={handleClose}
          variant="solid"
          color="primary"
        >
          Return to Dashboard
        </Button>
      </View>
    </Modal>
  );
};

export default SuccessModal;
