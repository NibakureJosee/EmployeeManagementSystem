import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthLayout from "../components/layouts/AuthLayout";
import useAuth from "../hooks/useAuth";

export default function Register() {
    const { register, registering } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const firstName = form.firstName.value;
        const lastName = form.firstName.value;
        const email = form.email.value;
        const password = form.password.value;
        const repeatPassword = form.repeatPassword.value;
        if (password !== repeatPassword) {
            notifications.show({
                title: "Error",
                message: "Passwords do not match",
                color: "red",
            });
            return;
        }
        register({
            firstName, lastName, email, password
        });
    }

    return (
        <>
            <Helmet>
                <title>Create account</title>
            </Helmet>
            <AuthLayout>
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to={'/'}>
                        </Link>
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-blue-900">
                            CREATE NEW ACCOUNT
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Already have an account{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                                SignIn
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6">
                                <AuthInput
                                    label="First Name"
                                    required
                                    type="text"
                                    name="firstName"
                                    min={2} max={50}
                                />
                                <AuthInput
                                    label="Last Name"
                                    required
                                    type="text"
                                    name="lastName"
                                    min={2} max={50}
                                />

                                <AuthInput
                                    label="Email Address"
                                    required
                                    autoComplete="email"
                                    type="email"
                                    name="email"
                                />

                                <AuthInput
                                    label="Password"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                    name="password"
                                    min={4} max={50}
                                />
                                <AuthInput
                                    label="Repeat Password"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                    name="repeatPassword"
                                    min={4} max={50}
                                />

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        loading={registering}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}
