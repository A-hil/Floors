import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CircleUserRound} from 'lucide-react';

export default function ViewCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
        Пока ничего нет...
    </>
  );
}
