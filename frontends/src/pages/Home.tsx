import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"
import { generatePageTitle } from "../lib/utils";
import { Button } from "@mantine/core";
import useAuth from "../hooks/useAuth";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Welcome")}</title>
            </Helmet>
            <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Welcome to our Library
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        {
                            " Please login or create an account to continue"
                        }
                    </p>
                    {
                        user ?
                            <Link to={'/dashboard'}>
                                <Button className="mt-10"
                                >
                                    Go to Dashboard
                                </Button>
                            </Link> :
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link to={'/login'}>
                                    <Button className="min-w-36"
                                    >
                                        Login Your Account
                                    </Button>
                                </Link>
                                <Link to={'/register'}>
                                    <Button
                                    >
                                        Create Account New Account
                                    </Button>
                                </Link>

                            </div>
                    }
                </div>
            </main>
        </>
    )
}
