import { Routes, Route, Navigate } from 'react-router-dom';
import { authorizedStructure } from '../AppRoutes';

export const AppRoutesProvider = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={authorizedStructure().fallbackRoute.route} />}
      />
      {authorizedStructure().routes.map(route => (
        <Route key={route.route} path={route.route} element={route.element} />
      ))}
    </Routes>
  );
};
