import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen bg-gray-700">
        <form className="flex flex-col items-center p-4 m-20 bg-gray-100 rounded-md w-150">
          <div className="px-20 py-6 mb-6 border-b">Log in Form</div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border border-gray-700 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="border border-gray-700 rounded-sm px-2 py-1"
            />
          </div>
          <button
            className="bg-gray-700 rounded-xl text-white px-10 py-2 mb-4"
            formAction={login}
          >
            Log in
          </button>
          <button
            className="border border-gray-700 rounded-xl px-10 py-2"
            formAction={signup}
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}
