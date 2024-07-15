// Example file structure, app/[...slug]/page.tsx
// You could alternatively use src/app/[...slug]/page.tsx/
import {
    Content,
    fetchOneEntry,
    getBuilderSearchParams,
    isPreviewing,
  } from '@builder.io/sdk-react'
  
  import { customComponents } from '@/components/custom-button';
  interface PageProps {
    params: {
      slug: string[];
    };
    searchParams: Record<string, string>;
  }
  
  // TO DO: Put here Public API Key here
  const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY as string
  
  export default async function Page(props: PageProps) {
    const urlPath = '/' + (props.params?.slug?.join('/') || '');
   
    const content = await fetchOneEntry({
      options: getBuilderSearchParams(props.searchParams),
      apiKey: PUBLIC_API_KEY,
      model: 'page',
      userAttributes: { urlPath },
    });
  
    const canShowContent = content || isPreviewing(props.searchParams);
  
    if (!canShowContent) {
      return (
        <>
          <h1>404</h1>
          <p>Make sure you have your content published at Builder.io.</p>
        </>
      );
    }
    return <Content 
    content={content} 
    apiKey={PUBLIC_API_KEY} 
    model="page" 
    customComponents={customComponents}/>;
  }