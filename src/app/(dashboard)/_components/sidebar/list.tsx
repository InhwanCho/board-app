'use client';
import { useOrganizationList } from '@clerk/nextjs';
import Item from './item';


export default function List() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })

  if (!userMemberships.data?.length) return null;
  return (
    <ul className='space-y-4'>
      {userMemberships.data?.map((men) => (
        <Item key={men.organization.id} id={men.organization.id} name={men.organization.name} imageUrl={men.organization.imageUrl}/>
      ))}

    </ul>
  )
}
