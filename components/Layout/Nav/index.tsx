import { Button, Text } from "@nextui-org/react";
import { Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

import Left from "../../Icons/Left";
import Menu from "../../Icons/Menu";
import Right from "../../Icons/Right";
import { NavProps } from "../../../types/nav";

export default function Nav({ prev, next }: NavProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const prevHandler = () => {
    router.push(`/${prev}`);
  };

  const nextHandler = () => {
    router.push(`/${next}`);
  };

  const menuLinksHandler = (path: string) => {
    setVisible(!visible);
    router.push(path);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem",
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Button
        color="secondary"
        auto
        rounded
        disabled={!prev}
        onPress={prevHandler}
        icon={<Left />}
      />
      <Button
        color="gradient"
        auto
        icon={<Menu />}
        onPressStart={() => setVisible(true)}
      />
      <Button
        color="secondary"
        auto
        rounded
        disabled={!next}
        onPress={nextHandler}
        icon={<Right />}
      />
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text size={16}>
            Welcome to the unofficial{" "}
            <Text b size={18}>
              The Whiteboard
            </Text>{" "}
            made mobile-friendly
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Button
            color="secondary"
            rounded
            onPress={() => menuLinksHandler("/")}
          >
            Todays comic
          </Button>
          <Button
            color="secondary"
            rounded
            onPressStart={() => menuLinksHandler("/autowb001.html")}
          >
            First comic
          </Button>
        </Modal.Body>
        <Modal.Footer>
          Made by <a href="https://github.com/nova93">@nova93</a>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
