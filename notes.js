/*

# Lazy loading - 
-> Lazy loading allows us to load components only when the component is needed. 
-> This is simple when using react router. 
-> With react we can import a component directly to a constant using the React.lazy() method
-> React.lazy(()=> import('./pages/welcome'))
-> It might take sometime for the component to load so we use Suspense which is also available in React
-> we will wrap the suspense around the switch component and pass the fallback to it
 <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
*/
