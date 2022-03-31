import { Link } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const onClickCalendar = useCallback(() => navigate('/calendar'), [navigate]);
  const onClickReports = useCallback(() => navigate('/reports'), [navigate]);
  const onClickSettings = useCallback(() => navigate('/settings'), [navigate]);
  return (
    <>
      <p>Homeページです。</p>
      <Link onClick={onClickCalendar}>カレンダー(ここしか実装していない)</Link>
      <br />
      <Link onClick={onClickReports}>レポート</Link>
      <br />
      <Link onClick={onClickSettings}>設定</Link>
      <br />
    </>
  );
};
