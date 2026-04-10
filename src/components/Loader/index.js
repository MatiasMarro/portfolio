import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// ─── Timings (ms) ───────────────────────────────────────────
// step1: black screen           → 2 000 ms
// step2: black + loading bar    → 4 000 ms
// step3: blue transition        → 1 500 ms
// login: user clicks to enter
// ────────────────────────────────────────────────────────────

function Loader({ onLogin }) {
  const [phase, setPhase] = useState('step1');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('step2'), 2000);
    const t2 = setTimeout(() => setPhase('step3'), 6000);
    const t3 = setTimeout(() => setPhase('login'), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === 'step1') return <Step1 />;
  if (phase === 'step2') return <Step2 />;
  if (phase === 'step3') return <Step3 />;
  return <Login onLogin={onLogin} />;
}

// ─── Step 1: Black screen ────────────────────────────────────
function Step1() {
  return <FullScreen style={{ background: '#000' }} />;
}

// ─── Step 2: Black + logo + loading bar ─────────────────────
function Step2() {
  return (
    <FullScreen style={{ background: '#000', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Step2Content>
        <LogoText>Matias Marro</LogoText>
        <LoadingBarWrapper>
          <LoadingBox />
          <LoadingBox />
          <LoadingBox />
        </LoadingBarWrapper>
      </Step2Content>
      <Step2Bottom>
        <span>Windows XP</span>
        <span>Professional</span>
      </Step2Bottom>
    </FullScreen>
  );
}

// ─── Step 3: Blue transition ─────────────────────────────────
function Step3() {
  return (
    <FullScreen style={{ background: 'radial-gradient(29.68% 27.76% at 5.94% 14.64%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.16) 59.9%, rgba(255,255,255,0) 100%), #567DDA' }}>
      <Step3Header />
      <Step3Footer />
    </FullScreen>
  );
}

// ─── Login screen ────────────────────────────────────────────
function Login({ onLogin }) {
  return (
    <LoginScreen>
      <LoginHeader />
      <LoginBody>
        <LoginLeft>
          <LoginTitle>Matias Marro</LoginTitle>
          <LoginSubtitle>Full Stack Developer · Software Engineer</LoginSubtitle>
          <LoginHint>Para comenzar, haz clic en tu nombre</LoginHint>
        </LoginLeft>
        <LoginDivider />
        <LoginRight>
          <LoginCard onClick={onLogin}>
            <Avatar>MM</Avatar>
            <UserName>Matias Marro</UserName>
            <UserRole>Administrador</UserRole>
          </LoginCard>
        </LoginRight>
      </LoginBody>
      <LoginFooter />
    </LoginScreen>
  );
}

// ─── Keyframes ───────────────────────────────────────────────
const loaderMove = keyframes`
  0%   { transform: translateX(-250px); }
  100% { transform: translateX(400px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ─── Styled Components ───────────────────────────────────────
const FullScreen = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  animation: ${fadeIn} 0.3s ease;
`;

const Step2Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const LogoText = styled.h1`
  color: #fff;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 32px;
`;

const LoadingBarWrapper = styled.div`
  border: 2px solid #b2b2b2;
  border-radius: 4px;
  padding: 2px;
  width: 220px;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 2px;
  overflow: hidden;
`;

const LoadingBox = styled.div`
  display: inline-block;
  height: 85%;
  width: 16px;
  flex-shrink: 0;
  background: linear-gradient(
    to bottom,
    #2838c7 0%,
    #5979ef 17%,
    #869ef3 32%,
    #869ef3 45%,
    #5979ef 59%,
    #2838c7 100%
  );
  animation: ${loaderMove} 3.5s linear infinite;
`;

const Step2Bottom = styled.div`
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-family: Tahoma, sans-serif;
`;

const Step3Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #012f9e;
  border-bottom: 2px solid #fefefe;
`;

const Step3Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: #012f9e;
  border-top: 2px solid #13920d;
`;

// Login
const LoginScreen = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(
    29.68% 27.76% at 5.94% 14.64%,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.16) 59.9%,
    rgba(255, 255, 255, 0) 100%
  ),
  #567dda;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.4s ease;
`;

const LoginHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: #012f9e;
  border-bottom: 2px solid #fefefe;
  flex-shrink: 0;
`;

const LoginBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0 40px;
`;

const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 40px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const LoginTitle = styled.h1`
  color: #fff;
  font-size: 28px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 400;
  margin: 0 0 8px;
  text-align: right;
`;

const LoginSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-family: Tahoma, sans-serif;
  text-align: right;
  margin: 0 0 16px;
`;

const LoginHint = styled.p`
  color: rgba(255, 255, 255, 0.65);
  font-size: 12px;
  font-family: Tahoma, sans-serif;
  text-align: right;
  margin: 0;
  font-style: italic;
`;

const LoginDivider = styled.div`
  width: 1px;
  height: 280px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.48) 49.48%,
    rgba(255, 255, 255, 0) 100%
  );
  flex-shrink: 0;
  @media (max-width: 600px) {
    display: none;
  }
`;

const LoginRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 40px;
`;

const LoginCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    #1442a7 0%,
    rgba(20, 66, 167, 0.56) 60%,
    rgba(20, 66, 167, 0) 100%
  );
  border: 1px solid #fefefe;
  transition: filter 0.15s;
  &:hover {
    filter: brightness(1.15);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid #ffcc00;
  background: #1a3a8a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  font-family: Tahoma, sans-serif;
  flex-shrink: 0;
`;

const UserName = styled.div`
  color: #fff;
  font-size: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 400;
`;

const UserRole = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  font-family: Tahoma, sans-serif;
  margin-top: 2px;
`;

const LoginFooter = styled.div`
  width: 100%;
  height: 100px;
  background-color: #012f9e;
  border-top: 2px solid #13920d;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
`;

export default Loader;
