import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountContext from "../../contexts/account-context";

const Navbar = ({ space }) => {
  const navigate = useNavigate();
  const { username, isSignedIn, signOut } = useContext(AccountContext);
  const spaceRef = useRef();

  const handleMoveSpace = () => {
    navigate(`/${spaceRef.current.value}`);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-xl rounded-box">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{space}'s Pictato</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <form className="join">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered join-item w-24 md:w-auto"
              ref={spaceRef}
            />
            <button
              onClick={handleMoveSpace}
              className="btn btn-secondary join-item"
            >
              Go
            </button>
          </form>
        </div>
        {isSignedIn ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={`/${username}`} className="justify-between">
                  {username}
                  <span className="badge">My Space</span>
                </Link>
              </li>
              <li>
                <a onClick={handleSignOut}>Sign Out</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/" className="btn btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
