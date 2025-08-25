import PropTypes from 'prop-types';

// --- Base and Helper Styles (Defined ONCE outside the component) ---
// This is more performant as these objects are not recreated on every render.
const baseBannerStyle = {
  width: '100%',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  transition: 'background 0.3s ease',
};

const loadingBannerStyle = {
  background: 'linear-gradient(to right, #fed7aa, #fecaca)',
  border: '1px solid #fdba74',
};

const errorBannerStyle = {
  background: 'linear-gradient(to right, #fca5a5, #ef4444)',
  border: '1px solid #dc2626',
};

const containerStyle = { display: 'flex', alignItems: 'center', gap: '16px' };
const iconStyle = {
  width: '48px',
  height: '48px',
  background: 'linear-gradient(135deg, #fb923c, #ef4444)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  flexShrink: 0,
};

const messageStyle = { fontSize: '14px', lineHeight: '1.4', flexGrow: 1, margin: 0 };
const loadingContainerStyle = { display: 'flex', gap: '4px', flexShrink: 0 };
const dotStyle = {
  width: '6px',
  height: '6px',
  backgroundColor: '#f97316',
  borderRadius: '50%',
  animation: 'bounce 1s infinite',
};

// Define keyframes outside as well. The <style> tag is still not ideal,
// but this keeps all style-related definitions together.
const keyframes = `
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

const ColdStartBanner = ({ status, error }) => {
  // 1. Guard clause: If successful, render nothing.
  if (status === 'success') {
    return null;
  }

  // 2. Conditionally construct the dynamic banner style inside the component.
  const bannerStyle = {
    ...baseBannerStyle,
    ...(status === 'error' ? errorBannerStyle : loadingBannerStyle),
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={bannerStyle}>
        <div style={containerStyle}>
          {/* Icon changes based on status */}
          <div style={iconStyle}>
            <span style={{ color: 'white', fontSize: '20px' }}>
              {status === 'loading' ? '🐼' : '⚠️'}
            </span>
          </div>

          {/* Message changes based on status */}
          <p style={messageStyle}>
            {status === 'loading' &&
              'Please hang on; a cold start has been initiated for the backend server.'}
            {status === 'error' &&
              `The server failed to respond correctly. Please try refreshing the page. (Details: ${error})`}
          </p>

          {/* Loading dots ONLY show when loading */}
          {status === 'loading' && (
            <div style={loadingContainerStyle}>
              <div style={{ ...dotStyle, animationDelay: '0s' }}></div>
              <div style={{ ...dotStyle, animationDelay: '0.1s' }}></div>
              <div style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Prop Types remain the same
ColdStartBanner.propTypes = {
  status: PropTypes.oneOf(['loading', 'success', 'error']).isRequired,
  error: PropTypes.string,
};

ColdStartBanner.defaultProps = {
  error: 'An unknown error occurred.',
};

export default ColdStartBanner;