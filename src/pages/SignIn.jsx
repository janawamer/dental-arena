import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function SignIn() {
  const [tab, setTab]       = useState('signin')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')
  const { signIn, signUp, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  async function handleSignIn(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.target)
    try {
      const result = await signIn({ email: fd.get('email'), password: fd.get('password') })
      console.log('signIn result:', result)
      const user = result?.user ?? result?.session?.user
      console.log('user:', user)
      if (!user) throw new Error('No user returned from sign in')
      // Fetch profile to check role for redirect
      const { data: prof, error: profErr } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      console.log('profile:', prof, 'error:', profErr)
      if (prof?.role === 'admin') {
        navigate('/admin', { replace: true })
      } else {
        navigate(from === '/signin' ? '/' : from, { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Sign in failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.target)
    if (fd.get('password') !== fd.get('confirm')) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }
    try {
      await signUp({
        email:    fd.get('email'),
        password: fd.get('password'),
        fullName: `${fd.get('firstName')} ${fd.get('lastName')}`.trim(),
        phone:    fd.get('phone'),
        address:  fd.get('address'),
        role:     fd.get('role'),
      })
      setError('')
      // Show success and switch to sign-in
      setTab('signin')
      setError('Account created! Check your email to confirm, then sign in.')
    } catch (err) {
      setError(err.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="Dental Arena" className="h-14 w-auto object-contain" />
          </Link>
        </div>

        <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
          {[['signin','Sign In'],['register','Register']].map(([id, label]) => (
            <button key={id} onClick={() => { setTab(id); setError('') }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tab === id ? 'bg-white text-arena-blue shadow-sm' : 'text-gray-500'}`}>
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div className={`flex items-start gap-2 p-3 rounded-xl text-sm mb-4 ${error.includes('created') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
          {tab === 'signin' ? (
            <>
              <h2 className="text-xl font-black text-gray-900 mb-1">Welcome back</h2>
              <p className="text-gray-400 text-sm mb-6">Sign in to your Dental Arena account</p>
              <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Email Address</label>
                  <input name="email" type="email" className="input" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Password</label>
                  <div className="relative">
                    <input name="password" type={showPwd ? 'text' : 'password'} className="input pr-12" placeholder="Your password" required />
                    <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" /> Remember me</label>
                  <a href="#" className="text-arena-blue font-semibold hover:underline">Forgot password?</a>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
                  {loading ? 'Signing in…' : <><span>Sign In</span> <ArrowRight size={18} /></>}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-black text-gray-900 mb-1">Create Account</h2>
              <p className="text-gray-400 text-sm mb-6">Join thousands of dental professionals</p>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm font-semibold mb-1.5">First Name</label><input name="firstName" className="input" placeholder="First" required /></div>
                  <div><label className="block text-sm font-semibold mb-1.5">Last Name</label><input name="lastName" className="input" placeholder="Last" required /></div>
                </div>
                <div><label className="block text-sm font-semibold mb-1.5">Email Address</label><input name="email" type="email" className="input" placeholder="you@example.com" required /></div>
                <div><label className="block text-sm font-semibold mb-1.5">Phone</label><input name="phone" type="tel" className="input" placeholder="+20 xxx xxx xxxx" required /></div>
                <div><label className="block text-sm font-semibold mb-1.5">Address <span className="text-red-500">*</span></label><input name="address" className="input" placeholder="Street, building, floor, apartment, city" required /></div>
                <div><label className="block text-sm font-semibold mb-1.5">I am a… <span className="text-red-500">*</span></label>
                  <select name="role" className="input" required>
                    <option value="Dentist">Dentist</option>
                    <option value="Dental Technician">Dental Technician</option>
                    <option value="Dental Student">Dental Student</option>
                    <option value="Clinic Owner">Clinic Owner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div><label className="block text-sm font-semibold mb-1.5">Password</label>
                  <div className="relative">
                    <input name="password" type={showPwd ? 'text' : 'password'} className="input pr-12" placeholder="Min 6 characters" required minLength={6} />
                    <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div><label className="block text-sm font-semibold mb-1.5">Confirm Password</label>
                  <input name="confirm" type="password" className="input" placeholder="Repeat password" required />
                </div>
                <label className="flex items-start gap-2 text-sm cursor-pointer">
                  <input type="checkbox" required className="mt-0.5" />
                  <span className="text-gray-600">I agree to the <Link to="/terms" className="text-arena-blue font-semibold hover:underline">Terms</Link> and <Link to="/privacy" className="text-arena-blue font-semibold hover:underline">Privacy Policy</Link></span>
                </label>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
                  {loading ? 'Creating account…' : <><span>Create Account</span> <ArrowRight size={18} /></>}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setTab(tab === 'signin' ? 'register' : 'signin'); setError('') }} className="text-arena-blue font-semibold hover:underline">
            {tab === 'signin' ? 'Register now' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
