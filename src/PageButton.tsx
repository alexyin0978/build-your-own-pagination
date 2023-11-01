import { Flex } from "@chakra-ui/layout";

type PageButtonProps = {
  content: number | JSX.Element;
  onClick: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
};

const PageButton = (props: PageButtonProps) => {
  const { content, onClick, isDisabled = false, isActive = false } = props;

  return (
    <Flex
      as={"button"}
      bg={isActive ? "gray.200" : "transparent"}
      borderRadius={"full"}
      w={8}
      h={8}
      justifyContent={"center"}
      alignItems={"center"}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      _hover={{
        transition: "background-color 0.1s ease-in",
        bg: isDisabled ? "" : "primary.light",
      }}
      onClick={isDisabled ? () => {} : onClick}
      color={isDisabled ? "gray.400" : "black"}
    >
      {content}
    </Flex>
  );
};

export default PageButton;
