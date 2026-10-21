import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const views = [
  { path: 'activities', label: 'Activities', Component: Activities },
  { path: 'leaderboard', label: 'Leaderboard', Component: Leaderboard },
  { path: 'teams', label: 'Teams', Component: Teams },
  { path: 'users', label: 'Users', Component: Users },
  { path: 'workouts', label: 'Workouts', Component: Workouts },
]

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="app-header">
        <div className="container-xl header-inner">
          <NavLink to="/activities" className="brand">
            <img src={logo} width="48" height="48" alt="" />
            <span>OctoFit <span className="brand-secondary">Tracker</span></span>
          </NavLink>
          <nav className="app-nav" aria-label="Main navigation">
            {views.map(({ path, label }) => (
              <NavLink key={path} to={`/${path}`}>{label}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" className="container-xl py-4 py-md-5" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          {views.map(({ path, Component }) => (
            <Route key={path} path={`/${path}`} element={<Component />} />
          ))}
          <Route path="*" element={
            <section>
              <h1>Page not found</h1>
              <NavLink to="/activities">Return to activities</NavLink>
            </section>
          } />
        </Routes>
      </main>
    </>
  )
}