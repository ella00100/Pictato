import { useRef, useContext } from "react";
import AccountContext from "../../contexts/account-context";
import { galleryApi } from "../../apis/galleryApi";

const Upload = () => {
  const { username, getIdToken, getAccessToken } = useContext(AccountContext);
  const fileRef = useRef();
  const memoRef = useRef();

  const handlePostRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("image-file", fileRef.current.files[0]);
      formData.append("file-name", fileRef.current.files[0].name);
      formData.append("memo", memoRef.current.value);

      const idToken = await getIdToken();
      const accessToken = await getAccessToken();

      await galleryApi.postPolaroid(username, formData, idToken, accessToken);
      window.location.reload();
    } catch (err) {
      alert(`POST에 실패했습니다. (${err})`);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">Upload</h3>
        <input
          type="file"
          className="file-input file-input-bordered w-full mt-2"
          ref={fileRef}
        />
        <textarea
          className="textarea textarea-bordered w-full mt-2"
          placeholder="Memo"
          ref={memoRef}
        />
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handlePostRequest}>
            POST
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Upload;
