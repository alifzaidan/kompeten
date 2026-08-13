<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $request): Response
    {
        $referralCode = $request->query('ref');

        if ($referralCode) {
            session(['affiliate_code' => $referralCode]);
        }

        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone_number' => 'required|string|max:20',
            'instance' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'affiliate_code' => 'nullable|string',
        ]);

        $affiliateCode = $request->input('affiliate_code');
        if ($affiliateCode) {
            session(['affiliate_code' => $affiliateCode]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'instance' => $request->instance,
            'city' => $request->city,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('user');

        event(new Registered($user));

        Auth::login($user);

        return to_route('home');
        // return to_route('verification.notice')->with('status', 'Pendaftaran berhasil! Silakan periksa email Anda untuk tautan verifikasi.');
    }
}
