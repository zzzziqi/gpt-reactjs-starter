import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import GithubLogo from '../../assets/images/github.svg';
import useTokenUsage from '../../store/tokenUsageStore.js';

function Navbar() {
  const { tokenUsage } = useTokenUsage();

  return (
    <nav className="flex items-center absolute w-full justify-between flex-wrap bg-wave-blue p-6">
      <div className="container mx-auto flex items-center justify-between gap-10">
        <NavLink className="flex items-center text-white" to="/">
          <img src={Logo} alt="GPT template logo" className="h-8 w-8 mr-2" />
          <span className="font-semibold text-xl">GPT STARTER</span>
        </NavLink>
        <div className="w-full">
          <ol className="flex flex-col justify-center items-left bg-white py-2 px-4 rounded-lg shadow-custom">
            <li className="w-[90%]"> Prompt token: {tokenUsage?.prompt_tokens}</li>
            <li>Completion token: {tokenUsage?.completion_tokens}</li>
            <li>Total token: {tokenUsage?.total_tokens}</li>
          </ol>
        </div>
        <NavLink
          className="text-white hover:opacity-80"
          to="https://github.com/GPT-Wizard/GPT-Starter"
        >
          <img src={GithubLogo} alt="github" className="h-8 w-8" />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
