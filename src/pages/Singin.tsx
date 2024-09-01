
import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
   

    try {
      setLoading(true);
      const res = await fetch('https://skill-test.similater.website/api/v1//user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
      console.log('Signup successful! Redirecting to login page...');
        setTimeout(() => {
          
          navigate('/home');
        }, 1000);
        return;
      } else {
       
      }
    } catch (error) {
      console.error('Error');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-4">
          <div className="mt-12">
            <Link to="/" className="text-5xl font-bold dark:text-white ">
              <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-lg text-white">Stars</span>
              Blog
            </Link>
            <p className="justify-center text-sm mt-4">The sun hung low in the sky, casting long shadows across the rugged landscape. The air was crisp, and the breeze was wafting with the scent of pine and damp earth.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
            <div className="">
              <div className="w-full mt-1">
                <label value="Your Email" />
                <input id="email" name="email" type="email" placeholder="name@example.com" onChange={handleChange} />
              </div>
              <div className="w-full mt-1">
                <label value="Your Password" />
                <input id="password" name="password" type="password" placeholder="*******************" onChange={handleChange} />
              </div>
              <button className="w-full mt-4" gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
               signin
              </button>
            </div>
          </form>
        
        </div>
      </div>
    </div>
  );
}