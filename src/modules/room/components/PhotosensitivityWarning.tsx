import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/modules/common/components/AlertDialog'
import { Checkbox } from '@/modules/common/components/Checkbox';

export default function PhotosensitivityWarning () {
  const [showPhotosensitivityWarning, setShowPhotosensitivityWarning] = useState(localStorage.getItem('hide_photosensitivity_warning') !== 'true')

  function handlePhotosensitivityWarningCheckbox (doNotShow: boolean) {
    localStorage.setItem('hide_photosensitivity_warning', doNotShow.toString())
  }

  return (
    <AlertDialog open={showPhotosensitivityWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Before you begin</AlertDialogTitle>
          <AlertDialogDescription className="text-lg py-4">
            <ul className="grid gap-8">
              <li>
                <strong>Photosensitivity warning:</strong>
                <p>
                  The generation process involves some flashing
                  imagery and sound. If you are sensitive to this, please consider closing
                  your eyes for about 30 seconds, or until music ends, once every person in
                  the room has readied up and the process starts.
                </p>
              </li>

              <li>
                <div className="items-center flex space-x-2">
                  <Checkbox id="do-not-show" onCheckedChange={handlePhotosensitivityWarningCheckbox} />
                  
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="do-not-show"
                      className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Don't show this again
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-md" onClick={() => setShowPhotosensitivityWarning(false)}>
            Okay, thank you for the heads up!
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}