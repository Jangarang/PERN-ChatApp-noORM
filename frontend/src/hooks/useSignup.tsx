type SignupInputs = {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
};

const useSignup = () => {
    
    const signup = async (inputs: SignupInputs) => {
        console.log(inputs);
        const response = await fetch('/api/auth/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(inputs)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Could not fetch data!');
        };

        const signupData = await response.json();
        console.log(signupData);    
    };

    return {signup};
}

export default useSignup;