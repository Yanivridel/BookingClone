import { ArrowRight } from './ui/Icons'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

interface MainCardAccountProps {
    item: any
        // {
        //     title: string,
        //     list: [
        //             {
        //               icon : string,
        //               title: string,
        //               link: string,
        //             },
                    
        //           ]  
        // }
    
}

function MainCardAccount({item} : MainCardAccountProps) {
  const navigate = useNavigate()

  const handleNavigate = (title: string) => {
    switch (title) {
      case 'Saved lists':
        navigate('/account/saved-lists/select');
        break;
      case 'Email preferences':
        navigate('/account/MySettings/Personal details');
        break;
      default:
        navigate(`/account/MySettings/${title}`);
        break;
    }
  };
  
  return (
    <div className='bg-white p-5 flex flex-col gap-3 rounded-lg border'>
      <h1 className='font-bold text-base'>{item.title}</h1>
      {item.list.map((listItem: any) => 
        <Button
          variant="ghost"
          className='flex justify-start gap-3'
          onClick={() => handleNavigate(listItem.title)}
        >
        <div className='w-5 h-5 mt-1'><listItem.icon /></div>
        <p className='text-sm font-normal'>{listItem.title}</p>
        <div><ArrowRight className='w-5 h-5 mt-1'/></div>
      </Button>
      )}
      
    </div>
  )
}
export default MainCardAccount
