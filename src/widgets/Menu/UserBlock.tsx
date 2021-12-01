import React from "react";
import Button from "../../components/Button/Button";
import { useWalletModal } from "../WalletModal";
import { Login } from "../WalletModal/types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <div>
      {account ? (
        <Button
          size="sm"
          variant="tertiary"
          style={{borderRadius:"2rem",padding:"0 1rem"}}
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
         style={{borderRadius:"2rem",padding:"0 1rem"}}
         size="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          <svg width="28" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" color="text" ><path fill-rule="evenodd" clip-rule="evenodd" d="M18.2406 13.2464H14.8672C13.2864 13.2464 11.9997 11.9605 11.9989 10.3805C11.9989 8.79885 13.2856 7.51219 14.8672 7.51135H18.2406C18.5856 7.51135 18.8656 7.79135 18.8656 8.13635C18.8656 8.48135 18.5856 8.76135 18.2406 8.76135H14.8672C13.9747 8.76219 13.2489 9.48802 13.2489 10.3797C13.2489 11.2705 13.9756 11.9964 14.8672 11.9964H18.2406C18.5856 11.9964 18.8656 12.2764 18.8656 12.6214C18.8656 12.9664 18.5856 13.2464 18.2406 13.2464" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.2485 10.953H14.9885C14.6435 10.953 14.3635 10.673 14.3635 10.328C14.3635 9.983 14.6435 9.703 14.9885 9.703H15.2485C15.5935 9.703 15.8735 9.983 15.8735 10.328C15.8735 10.673 15.5935 10.953 15.2485 10.953" fill="white"></path><mask id="mask0" maskUnits="userSpaceOnUse" x="1" y="2" width="18" height="17"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.66663 2.5H18.8655V18.4774H1.66663V2.5Z" fill="white"></path></mask><g mask="url(#mask0)"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.66459 3.75C4.59793 3.75 2.91626 5.43167 2.91626 7.49833V13.4792C2.91626 15.5458 4.59793 17.2275 6.66459 17.2275H13.8679C15.9346 17.2275 17.6154 15.5458 17.6154 13.4792V7.49833C17.6154 5.43167 15.9346 3.75 13.8679 3.75H6.66459ZM13.8679 18.4775H6.66459C3.90876 18.4775 1.66626 16.235 1.66626 13.4792V7.49833C1.66626 4.74167 3.90876 2.5 6.66459 2.5H13.8679C16.6238 2.5 18.8654 4.74167 18.8654 7.49833V13.4792C18.8654 16.235 16.6238 18.4775 13.8679 18.4775V18.4775Z" fill="white"></path></g><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5705 7.53174H6.07129C5.72629 7.53174 5.44629 7.25174 5.44629 6.90674C5.44629 6.56174 5.72629 6.28174 6.07129 6.28174H10.5705C10.9155 6.28174 11.1955 6.56174 11.1955 6.90674C11.1955 7.25174 10.9155 7.53174 10.5705 7.53174" fill="white"></path></svg>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default UserBlock;
