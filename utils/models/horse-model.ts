/*
import { Schema, models, model } from 'mongoose';

import { IHorse } from '../interfaces/horse-interface';


//import { connectMongo } from '../services/database';
import clientPromise from '@/lib/mongodb';

////import { getCoinConvert } from './settings-model';

//connectMongo();

const HorseSchema = new Schema({
  tokenId: {
    type: String,
    required: true,
    default: false,
  },
  contract: {
    type: String,
    required: true,
    default: false,
  },
  nft: {
    type: Object,
    required: true,
    default: false,
  },
});


export const Nft_horse = models.Nft_horse || model('nft_horse', HorseSchema);

//console.log('Nft_horse', Nft_horse);



export const getAllHorses = async () => {

  const horses: IHorse[] = (await Nft_horse.find({})) as IHorse[];

  console.log('horses', horses);

  if (horses) {
    return { success: true, horses: horses };
  } else {
    return { success: false, message: 'horses not found' };
  }
};



export const horseCount = async () => {
  const count = await Nft_horse.countDocuments({ status: true });
  return count;
};

*/

//import { IHorseHistory } from '@/utils/horseRace/interfaces/horseHistory';

import { IHorse } from '../interfaces/horse-interface';

import { connectMongo } from '@/utils/services/database';

import { Schema, models, model } from 'mongoose';

connectMongo();

const HorseSchema = new Schema({
  tokenId: {
    type: String,
    required: true,
    default: false,
  },
  contract: {
    type: String,
    required: true,
    default: false,
  },
  nft: {
    type: Object,
    required: true,
    default: false,
  },
});

export const HorseModel =
  models.nfthorse || model<IHorse>('nfthorse', HorseSchema);

//export const getAllHorses = async (): Promise<IHorse[]> => {


/*
3
const result  = await findOne({color: "gray", "object.name":"apple" })
*/
/*
{ 
    "names": {
        "$in": [
            { "firstname": "Tom", "lastname": "Smith" }, 
            { "firstname": "Bob", "lastname": "Smith" }  
        ]
    }
}
*/

export const getAllHorses = async (
  pageNumber: number,
  pagination: number
) => {

  console.log('pageNumber', pageNumber);

  const data =  await HorseModel.find (
    {
      'nft.rawMetadata.attributes': {
        $elemMatch: {
          trait_type: 'Grade',
          value: 'D',
        },
      },
    },
    )
    .sort({ tokenId: 1 })
    .skip((pageNumber - 1) * pagination)
    //limit is number of Records we want to display
    .limit(pagination)
    /*
    .then(data => {

      return {'nfts' : data, 'pageNumber' : (pageNumber + 1) };

    })
    */
    .catch(err => {
      ////return err;
    })
    

    return {'nfts' : data, 'pageNumber' : (pageNumber+1) };

};
