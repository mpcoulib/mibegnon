export function TargetIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50 10 C 70 10 90 25 90 50 C 90 75 70 90 50 90 C 30 90 10 75 10 50 C 10 25 30 10 50 10" />
        <path d="M 50 25 C 60 25 70 32 70 50 C 70 68 60 75 50 75 C 40 75 30 68 30 50 C 30 32 40 25 50 25" />
        <path d="M 50 40 C 55 40 58 43 58 50 C 58 57 55 60 50 60 C 45 60 42 57 42 50 C 42 43 45 40 50 40" />
        <path d="M 85 15 L 52 48 M 85 15 L 78 22 M 85 15 L 92 22" />
      </svg>
    );
  }
  
  export function ShieldIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50 15 L 80 25 C 82 28 85 55 82 70 C 75 85 55 92 50 95 C 45 92 25 85 18 70 C 15 55 18 28 20 25 Z" />
        <path d="M 35 50 L 45 62 L 68 38" strokeWidth="4" />
        <path d="M 50 15 L 50 30" strokeWidth="2" opacity="0.6" />
      </svg>
    );
  }
  
  export function SparklesIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50 20 L 52 45 L 55 48 L 80 50 L 55 52 L 52 55 L 50 80 L 48 55 L 45 52 L 20 50 L 45 48 L 48 45 Z" />
        <path d="M 75 25 L 76 32 L 78 33 L 85 34 L 78 35 L 76 37 L 75 44 L 74 37 L 72 35 L 65 34 L 72 33 L 74 32 Z" opacity="0.8" />
        <path d="M 25 70 L 26 77 L 28 78 L 35 79 L 28 80 L 26 82 L 25 89 L 24 82 L 22 80 L 15 79 L 22 78 L 24 77 Z" opacity="0.7" />
        <circle cx="85" cy="70" r="2" opacity="0.5" />
        <circle cx="15" cy="30" r="2" opacity="0.5" />
      </svg>
    );
  }
  
  export function UserCircleIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50 25 C 58 25 65 32 65 40 C 65 48 58 55 50 55 C 42 55 35 48 35 40 C 35 32 42 25 50 25" />
        <path d="M 30 75 C 30 65 35 58 50 58 C 65 58 70 65 70 75" />
        <path d="M 50 10 C 72 10 90 28 90 50 C 90 72 72 90 50 90 C 28 90 10 72 10 50 C 10 28 28 10 50 10" />
      </svg>
    );
  }
  
  export function SearchIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 40 25 C 52 24 62 34 62 46 C 62 58 52 68 40 68 C 28 68 18 58 18 46 C 18 34 28 24 40 25" />
        <path d="M 58 58 L 75 75 L 82 82" strokeWidth="4" />
        <path d="M 32 35 L 35 38" strokeWidth="2.5" />
        <path d="M 35 35 L 32 38" strokeWidth="2.5" />
      </svg>
    );
  }
  
  export function SendIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 15 50 L 85 20 L 65 85 L 50 55 Z" fill="currentColor" opacity="0.2" />
        <path d="M 15 50 L 85 20 M 85 20 L 65 85 M 65 85 L 50 55 M 50 55 L 15 50" />
        <path d="M 10 45 L 20 47" strokeWidth="2" opacity="0.5" />
        <path d="M 8 40 L 18 41" strokeWidth="2" opacity="0.5" />
        <path d="M 12 35 L 22 36" strokeWidth="2" opacity="0.4" />
      </svg>
    );
  }
  
  export function CalendarIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 20 30 L 80 30 L 80 85 L 20 85 Z" />
        <path d="M 20 45 L 80 45" strokeWidth="2" />
        <path d="M 35 25 L 35 35" strokeWidth="3.5" />
        <path d="M 65 25 L 65 35" strokeWidth="3.5" />
        <circle cx="35" cy="58" r="3" fill="currentColor" />
        <circle cx="50" cy="58" r="3" fill="currentColor" />
        <circle cx="65" cy="58" r="3" fill="currentColor" />
        <circle cx="35" cy="70" r="3" fill="currentColor" />
        <circle cx="50" cy="70" r="3" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }
  
  export function MapPinIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50 20 C 65 20 75 30 75 45 C 75 58 65 70 50 85 C 35 70 25 58 25 45 C 25 30 35 20 50 20" />
        <circle cx="50" cy="43" r="8" fill="currentColor" />
        <path d="M 50 85 L 48 90 L 50 92 L 52 90 Z" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }
  
  export function GraduationCapIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50 25 L 85 40 L 50 55 L 15 40 Z" fill="currentColor" opacity="0.2" />
        <path d="M 50 25 L 85 40 M 85 40 L 50 55 M 50 55 L 15 40 M 15 40 L 50 25" />
        <path d="M 30 45 L 30 60 C 30 65 38 72 50 72 C 62 72 70 65 70 60 L 70 45" />
        <path d="M 85 40 L 85 50" strokeWidth="2" />
        <circle cx="85" cy="53" r="3" fill="currentColor" />
      </svg>
    );
  }
  
  export function FlagIcon({ className = "", country = "" }: { className?: string; country?: string }) {
    const countryLower = country.toLowerCase();
    
    if (countryLower.includes('canada')) {
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M 15 10 L 15 90" strokeWidth="4" stroke="currentColor" />
          <circle cx="15" cy="10" r="3" fill="currentColor" />
          
          <path d="M 15 20 L 20 22 Q 28 21 35 22 L 35 55 Q 28 56 20 55 L 15 53 Z" fill="#E31E24">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 15 20 L 20 22 Q 28 21 35 22 L 35 55 Q 28 56 20 55 L 15 53 Z;
              M 15 20 L 20 21 Q 28 23 35 21 L 35 55 Q 28 54 20 56 L 15 53 Z;
              M 15 20 L 20 22 Q 28 21 35 22 L 35 55 Q 28 56 20 55 L 15 53 Z" />
          </path>
          
          <path d="M 35 22 Q 48 21 60 22 T 75 23 L 75 54 Q 62 55 50 54 T 35 55 Z" fill="white">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 35 22 Q 48 21 60 22 T 75 23 L 75 54 Q 62 55 50 54 T 35 55 Z;
              M 35 21 Q 48 23 60 21 T 75 22 L 75 55 Q 62 53 50 55 T 35 54 Z;
              M 35 22 Q 48 21 60 22 T 75 23 L 75 54 Q 62 55 50 54 T 35 55 Z" />
          </path>
          
          <path d="M 55 32 L 53 38 L 50 36 L 52 42 L 48 43 L 52 48 L 55 47 L 55 52 L 58 47 L 62 48 L 58 43 L 60 42 L 57 36 L 60 38 L 58 32 L 56.5 35 Z" fill="#E31E24" opacity="0.9">
            <animateTransform attributeName="transform" type="rotate" dur="2s" repeatCount="indefinite" values="0 55 42; -2 55 42; 0 55 42" />
          </path>
          
          <path d="M 75 23 Q 80 22 85 24 L 85 53 Q 80 55 75 54 Z" fill="#E31E24">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 75 23 Q 80 22 85 24 L 85 53 Q 80 55 75 54 Z;
              M 75 22 Q 80 24 85 23 L 85 54 Q 80 53 75 55 Z;
              M 75 23 Q 80 22 85 24 L 85 53 Q 80 55 75 54 Z" />
          </path>
          
          <g opacity="0.4">
            <path d="M 87 30 L 93 29" strokeWidth="2" stroke="currentColor">
              <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0.4;0.1;0.4" />
            </path>
            <path d="M 87 40 L 92 39" strokeWidth="2" stroke="currentColor">
              <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" begin="0.5s" values="0.3;0.1;0.3" />
            </path>
          </g>
        </svg>
      );
    }
    
    if (countryLower.includes('états-unis') || countryLower.includes('usa') || countryLower.includes('united states')) {
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M 15 10 L 15 90" strokeWidth="4" stroke="currentColor" />
          <circle cx="15" cy="10" r="3" fill="currentColor" />
          
          <path d="M 15 20 L 20 21 Q 30 20 40 21 L 40 38 Q 30 39 20 38 L 15 37 Z" fill="#3C3B6E">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 15 20 L 20 21 Q 30 20 40 21 L 40 38 Q 30 39 20 38 L 15 37 Z;
              M 15 20 L 20 20 Q 30 22 40 20 L 40 39 Q 30 37 20 39 L 15 37 Z;
              M 15 20 L 20 21 Q 30 20 40 21 L 40 38 Q 30 39 20 38 L 15 37 Z" />
          </path>
          
          <circle cx="25" cy="26" r="1.5" fill="white" />
          <circle cx="30" cy="26" r="1.5" fill="white" />
          <circle cx="35" cy="26" r="1.5" fill="white" />
          <circle cx="27.5" cy="30" r="1.5" fill="white" />
          <circle cx="32.5" cy="30" r="1.5" fill="white" />
          <circle cx="25" cy="34" r="1.5" fill="white" />
          <circle cx="30" cy="34" r="1.5" fill="white" />
          <circle cx="35" cy="34" r="1.5" fill="white" />
          
          <path d="M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 27 Q 60 28 35 27 T 20 26 L 15 25 Z" fill="#B22234">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 27 Q 60 28 35 27 T 20 26 L 15 25 Z;
              M 15 20 L 20 20 Q 45 22 70 20 T 85 21 L 85 28 Q 60 26 35 28 T 20 27 L 15 25 Z;
              M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 27 Q 60 28 35 27 T 20 26 L 15 25 Z" />
          </path>
          
          <path d="M 15 33 L 20 34 Q 45 33 70 34 T 85 35 L 85 40 Q 60 41 35 40 T 20 39 L 15 38 Z" fill="#B22234">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.3s" values="
              M 15 33 L 20 34 Q 45 33 70 34 T 85 35 L 85 40 Q 60 41 35 40 T 20 39 L 15 38 Z;
              M 15 33 L 20 33 Q 45 35 70 33 T 85 34 L 85 41 Q 60 39 35 41 T 20 40 L 15 38 Z;
              M 15 33 L 20 34 Q 45 33 70 34 T 85 35 L 85 40 Q 60 41 35 40 T 20 39 L 15 38 Z" />
          </path>
          
          <path d="M 15 45 L 20 46 Q 45 45 70 46 T 85 47 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z" fill="#B22234">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.6s" values="
              M 15 45 L 20 46 Q 45 45 70 46 T 85 47 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z;
              M 15 45 L 20 45 Q 45 47 70 45 T 85 46 L 85 53 Q 60 51 35 53 T 20 52 L 15 50 Z;
              M 15 45 L 20 46 Q 45 45 70 46 T 85 47 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z" />
          </path>
          
          <path d="M 15 27 L 20 28 Q 45 27 70 28 T 85 29 L 85 33 Q 60 34 35 33 T 20 32 L 15 31 Z" fill="white">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.15s" values="
              M 15 27 L 20 28 Q 45 27 70 28 T 85 29 L 85 33 Q 60 34 35 33 T 20 32 L 15 31 Z;
              M 15 27 L 20 27 Q 45 29 70 27 T 85 28 L 85 34 Q 60 32 35 34 T 20 33 L 15 31 Z;
              M 15 27 L 20 28 Q 45 27 70 28 T 85 29 L 85 33 Q 60 34 35 33 T 20 32 L 15 31 Z" />
          </path>
          
          <path d="M 15 40 L 20 41 Q 45 40 70 41 T 85 42 L 85 45 Q 60 46 35 45 T 20 44 L 15 43 Z" fill="white">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.45s" values="
              M 15 40 L 20 41 Q 45 40 70 41 T 85 42 L 85 45 Q 60 46 35 45 T 20 44 L 15 43 Z;
              M 15 40 L 20 40 Q 45 42 70 40 T 85 41 L 85 46 Q 60 44 35 46 T 20 45 L 15 43 Z;
              M 15 40 L 20 41 Q 45 40 70 41 T 85 42 L 85 45 Q 60 46 35 45 T 20 44 L 15 43 Z" />
          </path>
          
          <g opacity="0.4">
            <path d="M 87 30 L 93 29" strokeWidth="2" stroke="currentColor">
              <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0.4;0.1;0.4" />
            </path>
          </g>
        </svg>
      );
    }
    
    if (countryLower.includes('france')) {
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M 15 10 L 15 90" strokeWidth="4" stroke="currentColor" />
          <circle cx="15" cy="10" r="3" fill="currentColor" />
          
          <path d="M 15 20 L 20 21 Q 30 20 40 21 L 40 54 Q 30 55 20 54 L 15 53 Z" fill="#002395">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 15 20 L 20 21 Q 30 20 40 21 L 40 54 Q 30 55 20 54 L 15 53 Z;
              M 15 20 L 20 20 Q 30 22 40 20 L 40 55 Q 30 53 20 55 L 15 53 Z;
              M 15 20 L 20 21 Q 30 20 40 21 L 40 54 Q 30 55 20 54 L 15 53 Z" />
          </path>
          
          <path d="M 40 21 Q 50 20 60 21 L 60 54 Q 50 55 40 54 Z" fill="white">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.3s" values="
              M 40 21 Q 50 20 60 21 L 60 54 Q 50 55 40 54 Z;
              M 40 20 Q 50 22 60 20 L 60 55 Q 50 53 40 55 Z;
              M 40 21 Q 50 20 60 21 L 60 54 Q 50 55 40 54 Z" />
          </path>
          
          <path d="M 60 21 Q 70 20 80 21 T 85 22 L 85 53 Q 75 54 65 53 T 60 54 Z" fill="#ED2939">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.6s" values="
              M 60 21 Q 70 20 80 21 T 85 22 L 85 53 Q 75 54 65 53 T 60 54 Z;
              M 60 20 Q 70 22 80 20 T 85 21 L 85 54 Q 75 53 65 54 T 60 55 Z;
              M 60 21 Q 70 20 80 21 T 85 22 L 85 53 Q 75 54 65 53 T 60 54 Z" />
          </path>
          
          <g opacity="0.4">
            <path d="M 87 30 L 93 29" strokeWidth="2" stroke="currentColor">
              <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0.4;0.1;0.4" />
            </path>
            <path d="M 87 40 L 92 39" strokeWidth="2" stroke="currentColor">
              <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" begin="0.5s" values="0.3;0.1;0.3" />
            </path>
          </g>
        </svg>
      );
    }
    
    if (countryLower.includes('royaume-uni') || countryLower.includes('united kingdom') || countryLower.includes('angleterre') || countryLower.includes('uk')) {
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M 15 10 L 15 90" strokeWidth="4" stroke="currentColor" />
          <circle cx="15" cy="10" r="3" fill="currentColor" />
          
          <path d="M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 53 Q 60 54 35 53 T 20 54 L 15 53 Z" fill="#012169">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 53 Q 60 54 35 53 T 20 54 L 15 53 Z;
              M 15 20 L 20 20 Q 45 22 70 20 T 85 21 L 85 54 Q 60 52 35 54 T 20 55 L 15 53 Z;
              M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 53 Q 60 54 35 53 T 20 54 L 15 53 Z" />
          </path>
          
          <path d="M 15 35 L 20 36 Q 45 35 70 36 T 85 37 L 85 40 Q 60 41 35 40 T 20 39 L 15 38 Z" fill="white">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.2s" values="
              M 15 35 L 20 36 Q 45 35 70 36 T 85 37 L 85 40 Q 60 41 35 40 T 20 39 L 15 38 Z;
              M 15 35 L 20 35 Q 45 37 70 35 T 85 36 L 85 41 Q 60 39 35 41 T 20 40 L 15 38 Z;
              M 15 35 L 20 36 Q 45 35 70 36 T 85 37 L 85 40 Q 60 41 35 40 T 20 39 L 15 38 Z" />
          </path>
          
          <path d="M 48 20 Q 50 21 52 20 L 52 54 Q 50 55 48 54 Z" fill="white">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.2s" values="
              M 48 20 Q 50 21 52 20 L 52 54 Q 50 55 48 54 Z;
              M 48 20 Q 50 22 52 20 L 52 55 Q 50 53 48 55 Z;
              M 48 20 Q 50 21 52 20 L 52 54 Q 50 55 48 54 Z" />
          </path>
          
          <path d="M 15 36 L 20 37 Q 45 36 70 37 T 85 38 L 85 39 Q 60 40 35 39 T 20 38 L 15 37 Z" fill="#C8102E">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.3s" values="
              M 15 36 L 20 37 Q 45 36 70 37 T 85 38 L 85 39 Q 60 40 35 39 T 20 38 L 15 37 Z;
              M 15 36 L 20 36 Q 45 38 70 36 T 85 37 L 85 40 Q 60 38 35 40 T 20 39 L 15 37 Z;
              M 15 36 L 20 37 Q 45 36 70 37 T 85 38 L 85 39 Q 60 40 35 39 T 20 38 L 15 37 Z" />
          </path>
          
          <path d="M 49 20 Q 50 21 51 20 L 51 54 Q 50 55 49 54 Z" fill="#C8102E">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.3s" values="
              M 49 20 Q 50 21 51 20 L 51 54 Q 50 55 49 54 Z;
              M 49 20 Q 50 22 51 20 L 51 55 Q 50 53 49 55 Z;
              M 49 20 Q 50 21 51 20 L 51 54 Q 50 55 49 54 Z" />
          </path>
          
          <g opacity="0.4">
            <path d="M 87 30 L 93 29" strokeWidth="2" stroke="currentColor">
              <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0.4;0.1;0.4" />
            </path>
          </g>
        </svg>
      );
    }
    
    if (countryLower.includes('allemagne') || countryLower.includes('germany')) {
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M 15 10 L 15 90" strokeWidth="4" stroke="currentColor" />
          <circle cx="15" cy="10" r="3" fill="currentColor" />
          
          <path d="M 15 22 L 20 23 Q 45 22 70 23 T 85 24 L 85 33 Q 60 34 35 33 T 20 32 L 15 31 Z" fill="#000000">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
              M 15 22 L 20 23 Q 45 22 70 23 T 85 24 L 85 33 Q 60 34 35 33 T 20 32 L 15 31 Z;
              M 15 22 L 20 22 Q 45 24 70 22 T 85 23 L 85 34 Q 60 32 35 34 T 20 33 L 15 31 Z;
              M 15 22 L 20 23 Q 45 22 70 23 T 85 24 L 85 33 Q 60 34 35 33 T 20 32 L 15 31 Z" />
          </path>
          
          <path d="M 15 33 L 20 34 Q 45 33 70 34 T 85 35 L 85 43 Q 60 44 35 43 T 20 42 L 15 41 Z" fill="#DD0000">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.3s" values="
              M 15 33 L 20 34 Q 45 33 70 34 T 85 35 L 85 43 Q 60 44 35 43 T 20 42 L 15 41 Z;
              M 15 33 L 20 33 Q 45 35 70 33 T 85 34 L 85 44 Q 60 42 35 44 T 20 43 L 15 41 Z;
              M 15 33 L 20 34 Q 45 33 70 34 T 85 35 L 85 43 Q 60 44 35 43 T 20 42 L 15 41 Z" />
          </path>
          
          <path d="M 15 43 L 20 44 Q 45 43 70 44 T 85 45 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z" fill="#FFCE00">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.6s" values="
              M 15 43 L 20 44 Q 45 43 70 44 T 85 45 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z;
              M 15 43 L 20 43 Q 45 45 70 43 T 85 44 L 85 53 Q 60 51 35 53 T 20 52 L 15 50 Z;
              M 15 43 L 20 44 Q 45 43 70 44 T 85 45 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z" />
          </path>
          
          <g opacity="0.4">
            <path d="M 87 35 L 93 34" strokeWidth="2" stroke="currentColor">
              <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0.4;0.1;0.4" />
            </path>
          </g>
        </svg>
      );
    }
    
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 15 10 L 15 90" strokeWidth="4" />
        <circle cx="15" cy="10" r="3" fill="currentColor" />
        
        <path d="M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 32 Q 60 33 35 32 T 20 31 L 15 30 Z" fill="#1B6B3A" opacity="0.9">
          <animate attributeName="d" dur="2s" repeatCount="indefinite" values="
            M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 32 Q 60 33 35 32 T 20 31 L 15 30 Z;
            M 15 20 L 20 20 Q 45 22 70 20 T 85 21 L 85 33 Q 60 31 35 33 T 20 32 L 15 30 Z;
            M 15 20 L 20 21 Q 45 20 70 21 T 85 22 L 85 32 Q 60 33 35 32 T 20 31 L 15 30 Z" />
        </path>
        
        <path d="M 15 32 L 20 33 Q 45 32 70 33 T 85 34 L 85 43 Q 60 44 35 43 T 20 42 L 15 41 Z" fill="white" opacity="0.95">
          <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.3s" values="
            M 15 32 L 20 33 Q 45 32 70 33 T 85 34 L 85 43 Q 60 44 35 43 T 20 42 L 15 41 Z;
            M 15 32 L 20 32 Q 45 34 70 32 T 85 33 L 85 44 Q 60 42 35 44 T 20 43 L 15 41 Z;
            M 15 32 L 20 33 Q 45 32 70 33 T 85 34 L 85 43 Q 60 44 35 43 T 20 42 L 15 41 Z" />
        </path>
        
        <path d="M 15 43 L 20 44 Q 45 43 70 44 T 85 45 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z" fill="#E87722" opacity="0.9">
          <animate attributeName="d" dur="2s" repeatCount="indefinite" begin="0.6s" values="
            M 15 43 L 20 44 Q 45 43 70 44 T 85 45 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z;
            M 15 43 L 20 43 Q 45 45 70 43 T 85 44 L 85 53 Q 60 51 35 53 T 20 52 L 15 50 Z;
            M 15 43 L 20 44 Q 45 43 70 44 T 85 45 L 85 52 Q 60 53 35 52 T 20 51 L 15 50 Z" />
        </path>
        
        <g opacity="0.4">
          <path d="M 87 30 L 93 29" strokeWidth="2">
            <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0.4;0.1;0.4" />
          </path>
          <path d="M 87 40 L 92 39" strokeWidth="2">
            <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" begin="0.5s" values="0.3;0.1;0.3" />
          </path>
        </g>
      </svg>
    );
  }