import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/ui/Sidebar';
import RecuriterDashboard from './RecuriterDashboard';
import RecuriterCandiateResume from './RecuriterCandiateResume';
import RecuriterSetting from './RecuriterSetting';

function RecruiterLayout() {
  const [activePage, setActivePage] = useState('Dashboard');
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const hash = window.location.hash;
    const pattern = /#(\w+)-(\w+)/; // Matches #PageName-userId

    if (pattern.test(hash)) {
      const [, page, id] = hash.match(pattern);
      if (id === userId) {
        setActivePage(page);
      } else {
        window.location.hash = `#Dashboard-${userId}`;
        setActivePage('Dashboard');
      }
    } else {
      window.location.hash = `#Dashboard-${userId}`;
      setActivePage('Dashboard');
    }
  }, [userId]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const pattern = /#(\w+)-(\w+)/;

      if (pattern.test(hash)) {
        const [, page, id] = hash.match(pattern);
        if (id === userId) {
          setActivePage(page);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [userId]);

  const renderMainContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <RecuriterDashboard />;
      case 'Candiateresume':
        return <RecuriterCandiateResume />;
      case 'Setting':
        return <RecuriterSetting />;
      default:
        return <RecuriterDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-1 bg-gray-100">{renderMainContent()}</main>
    </div>
  );
}

export default RecruiterLayout;
