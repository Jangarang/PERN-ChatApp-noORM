import { Link } from 'react-router';

const SignUp = () => {
    return (
		// min-w-96, flex-col
        <div className='flex flex-col items-center justify-center min-h-screen mx-auto'>
			<div className='max-w-md p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>
                <form>
                    <div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'	
						/>
					</div>
                </form>
            </div>
            
        </div>
    )
};

export default SignUp;