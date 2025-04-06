import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'

function CreditAccount() {

  const {t} = useTranslation();

  return (
    <div className='p-2 bg-white rounded-lg h-full'>
      <div className='flex p-4 justify-between'>
          <p className='text-sm'>{t("MyAccount.NoCredits")}</p>
          <p>0</p>
      </div>
      <div>
      <Button variant="ghost" className='text-blue-600 hover:bg-accent hover:text-blue-600'>{t("MyAccount.MoreDetails")}</Button>
      </div>
    </div>
  )
}

export default CreditAccount
