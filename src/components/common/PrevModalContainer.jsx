import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PrevModal from "./PrevModal";

const PrevModalContainerBlock = styled.div``;

const PrevModalContainer = ({ children, prev }) => {
  const navigate = useNavigate();
  const [isVisiblePrevModal, setVisiblePrevModal] = useState(false);

  const handleEvent = () => {
    window.history.pushState(null, null, window.location.href);
    setVisiblePrevModal(true);
  };

  const onCloseModal = () => {
    setVisiblePrevModal(false);
  };

  const onMovePrevPage = () => {
    navigate(`${prev}`);
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handleEvent);
    return () => {
      window.removeEventListener("popstate", handleEvent);
    };
  }, []);
  return (
    <PrevModalContainerBlock>
      {children}
      {isVisiblePrevModal && (
        <PrevModal
          onCloseModal={onCloseModal}
          onMovePrevPage={onMovePrevPage}
        />
      )}
    </PrevModalContainerBlock>
  );
};

export default PrevModalContainer;
