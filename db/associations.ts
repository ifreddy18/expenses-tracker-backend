import {
    associations,
} from './models';


export const setAssociations = (): void => {
    for (const modelAssociation of associations) {
        modelAssociation();
    }
};

