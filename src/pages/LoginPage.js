// import Button from '../components/buttons/Button';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { AuthContext } from '../components/context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
function LoginPage() {
  const {login}=useContext(AuthContext);
  const handleLogin=()=>{
    login();
  }
  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4">Login</Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>

          <Button onClick={handleLogin} className="mt-6" fullWidth>
            Login
          </Button>
          <Link
            to="/forgetpassword"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700 ml-2"
          >
            Forgot Password?
          </Link>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700 ml-2"
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
