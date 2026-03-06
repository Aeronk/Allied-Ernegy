// Components
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <AuthLayout
            title="Verify email"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <>
                    <Button disabled={processing} variant="secondary">
                        {processing && <Spinner />}
                        Resend verification email
                    </Button>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="mx-auto block text-sm"
                    >
                        Log out
                    </Link>
                </>
            </form>
        </AuthLayout>
    );
}
