import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface PaymentSuccessModalProps {
    open: boolean
    onClose: () => void
}

export default function PaymentSuccessModal({ open, onClose }: PaymentSuccessModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-sm text-center p-6 rounded-2xl">
            <DialogHeader>
            <CheckCircle className="mx-auto text-green-500 h-12 w-12 mb-2" />
            <DialogTitle className="text-2xl font-bold">Payment Successful!</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground text-sm">
            Your booking has been confirmed. A confirmation email has been sent to your inbox.
            </p>
            <DialogFooter className="mt-6">
            <Button onClick={onClose} className="w-full">
                Got it
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
