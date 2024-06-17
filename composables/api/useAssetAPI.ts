import { Asset, UpdateAssetRequest, type CreateAssetRequest } from '~/types/assets';
import useApiBase from './useApiBase';

export default () => {
    const { fetchApiBase } = useApiBase();
    const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

    async function getAssets(searchParam) {
      let url = new URL('api/assets', apiBaseUrl);
      if (searchParam.name) {
        url.searchParams.append('name', searchParam.name);
      }
      if (searchParam.department_id) {
        url.searchParams.append('department_id', searchParam.department_id.toString());
      }
      const { assets } = await fetchApiBase(url.toString(), 'get');
      return assets as Asset[]; 
    }
    async function createAsset(payload:CreateAssetRequest){
      const { asset } = await fetchApiBase('/assets', 'post', payload)
      return asset as Asset
    }
    async function updateAsset(id:string,payload:UpdateAssetRequest){
      const { asset } = await fetchApiBase(`/assets/${id}`,'put',payload)
      return asset as Asset
    }
     async function deleteAsset(id:string){
      const { asset } = await fetchApiBase(`/assets/${id}`,'delete')
      return asset as Asset
    }
    async function getAsset(id){
      const { assets } = await fetchApiBase(`/assets/${id}`, 'get');
      return assets as Asset[]; 
    }

    return {
        //data
        //methods
        getAssets,
        createAsset,
        updateAsset,
        deleteAsset,
        getAsset
    };
};
