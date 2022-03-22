import React, { useMemo, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const TrackingContext = createContext();

function TrackingProvider({ children, tracking }) {
  const track = (event, properties, ...opts) =>
    tracking.track(
      event,
      { ...properties, environment: process.env.NODE_ENV },
      ...opts
    );
  const identify = (userIdentification) =>
    tracking.identify(userIdentification);
  const setUserInfo = ({ name }) => tracking.people.set({ name });

  const value = useMemo(
    () => ({
      track,
      identify,
      setUserInfo,
    }),
    [track, identify, setUserInfo]
  );

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
}

TrackingProvider.propTypes = {
  children: PropTypes.node.isRequired,
  tracking: PropTypes.shape({
    track: PropTypes.func,
    identify: PropTypes.func,
    people: PropTypes.shape({
      set: PropTypes.func,
    }),
  }).isRequired,
};

function useTracking() {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking mst be used within a TrackingProvider');
  }
  return context;
}

export { TrackingContext, TrackingProvider, useTracking };
