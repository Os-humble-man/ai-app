import React, { createContext, useContext, useState } from 'react';

interface RagModeContextType {
   isRagMode: boolean;
   setIsRagMode: (enabled: boolean) => void;
}

const RagModeContext = createContext<RagModeContextType | undefined>(undefined);

export const RagModeProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [isRagMode, setIsRagMode] = useState(false);

   return (
      <RagModeContext.Provider value={{ isRagMode, setIsRagMode }}>
         {children}
      </RagModeContext.Provider>
   );
};

export const useRagMode = () => {
   const context = useContext(RagModeContext);
   if (context === undefined) {
      throw new Error('useRagMode must be used within a RagModeProvider');
   }
   return context;
};
