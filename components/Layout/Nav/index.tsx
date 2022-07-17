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
  const modalHandler = () => {
    console.log("triggered!");
    console.log("old", visible);
    console.log("new", !visible);
    setVisible(!visible);
  };

  const prevHandler = () => {
    router.push(`/${prev}`);
  };

  const nextHandler = () => {
    router.push(`/${next}`);
  };

  const menuLinksHandler = (path: string) => {
    console.log("clicked on the handler");
    modalHandler();
    router.push(path);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem",
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
      <Button color="gradient" auto icon={<Menu />} onClick={modalHandler} />
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
        onClose={modalHandler}
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
            onPressStart={() => menuLinksHandler("/")}
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
